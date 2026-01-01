import React, { useRef, useState, useEffect } from 'react';
import { PlacedItem, RoomDimensions } from '../types';
import { checkCollision, checkWallValidation, validateLayout } from '../utils/plannerUtils';
import { AlertTriangle, RotateCw, Trash2, Maximize, Lock, Move } from 'lucide-react';

interface Planner2DProps {
  items: PlacedItem[];
  room: RoomDimensions;
  onUpdateItems: (items: PlacedItem[]) => void;
  readOnly?: boolean;
}

const SCALE_FACTOR = 0.5; // Visual scale (pixels per cm)

export const Planner2D: React.FC<Planner2DProps> = ({ items, room, onUpdateItems, readOnly = false }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle item selection
  const handleItemClick = (e: React.MouseEvent, id: string) => {
    if (readOnly) return;
    e.stopPropagation();
    setSelectedId(id);
  };

  // Handle background click to deselect
  const handleBgClick = () => {
    setSelectedId(null);
  };

  // Handle Item Move (Drag Simulation)
  const handlePointerDown = (e: React.PointerEvent, item: PlacedItem) => {
    if (readOnly) return;
    e.stopPropagation();
    // Prevent default touch actions (scrolling) only when touching an item
    e.currentTarget.setPointerCapture(e.pointerId);
    
    setSelectedId(item.instanceId);
    setIsDragging(true);
    
    setDragOffset({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !selectedId || readOnly) return;
    e.preventDefault(); // Important for touch
    
    const deltaX = (e.clientX - dragOffset.x) / SCALE_FACTOR;
    const deltaY = (e.clientY - dragOffset.y) / SCALE_FACTOR;

    const updatedItems = items.map(item => {
      if (item.instanceId === selectedId) {
        return {
          ...item,
          x: item.x + deltaX,
          y: item.y + deltaY
        };
      }
      return item;
    });

    onUpdateItems(validateLayout(updatedItems, room));
    
    setDragOffset({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Actions
  const rotateItem = () => {
    if (!selectedId) return;
    const updated = items.map(item => {
      if (item.instanceId === selectedId) {
        return { ...item, width: item.depth, depth: item.width, rotation: (item.rotation + 90) % 360 };
      }
      return item;
    });
    onUpdateItems(validateLayout(updated, room));
  };

  const deleteItem = () => {
    if (!selectedId) return;
    const updated = items.filter(item => item.instanceId !== selectedId);
    onUpdateItems(validateLayout(updated, room));
    setSelectedId(null);
  };

  const selectedItem = items.find(i => i.instanceId === selectedId);

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
      {/* Toolbar */}
      {!readOnly && (
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 justify-between shadow-sm z-10">
          <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
            {selectedItem ? (
              <><Move size={14} className="text-brand-600"/> {selectedItem.name}</>
            ) : (
              <span className="text-gray-400 font-normal">물품을 선택하여 이동/회전</span>
            )}
          </span>
          <div className="flex gap-2">
             <button 
              onClick={rotateItem} 
              disabled={!selectedItem}
              className="p-1.5 text-gray-600 hover:bg-brand-50 hover:text-brand-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="90도 회전"
            >
              <RotateCw size={18} />
            </button>
            <button 
              onClick={deleteItem} 
              disabled={!selectedItem}
              className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="삭제"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div 
        className="flex-1 overflow-auto p-8 relative flex items-center justify-center cursor-crosshair bg-slate-50/50"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleBgClick}
        style={{ touchAction: 'none' }} // Crucial for mobile dragging
      >
        {/* Room Container */}
        <div 
          ref={containerRef}
          className="bg-white shadow-2xl relative border-4 border-slate-800 transition-all"
          style={{
            width: room.width * SCALE_FACTOR,
            height: room.depth * SCALE_FACTOR,
            boxSizing: 'content-box'
          }}
        >
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: `${10 * SCALE_FACTOR}px ${10 * SCALE_FACTOR}px`
            }}
          />

          {/* Door */}
          <div 
            className="absolute bottom-[-8px] bg-white border-x-4 border-slate-800 h-2 z-10"
            style={{
              left: room.doorX * SCALE_FACTOR,
              width: room.doorWidth * SCALE_FACTOR
            }}
          >
            <div className="absolute top-2 left-0 w-full h-[30px] border-l border-b border-dashed border-slate-400 rounded-bl-full opacity-50 origin-top-left" 
                 style={{ transform: 'rotate(-45deg)' }} />
            <span className="absolute top-3 w-full text-center text-[10px] font-bold text-slate-500">출입문</span>
          </div>

          {/* Items */}
          {items.map(item => (
            <div
              key={item.instanceId}
              onPointerDown={(e) => handlePointerDown(e, item)}
              onClick={(e) => handleItemClick(e, item.instanceId)}
              className={`absolute flex flex-col items-center justify-center text-center p-0.5 overflow-hidden transition-all select-none group rounded-[2px]
                ${item.isCollision || item.isWallViolation 
                  ? 'bg-red-100/90 border-2 border-red-500 shadow-red-200' 
                  : 'bg-brand-50/90 border border-brand-400 shadow-sm'}
                ${selectedId === item.instanceId ? 'ring-2 ring-brand-500 z-50 shadow-xl scale-[1.02]' : 'z-20'}
              `}
              style={{
                left: item.x * SCALE_FACTOR,
                top: item.y * SCALE_FACTOR,
                width: item.width * SCALE_FACTOR,
                height: item.depth * SCALE_FACTOR,
                cursor: readOnly ? 'default' : 'move'
              }}
            >
              <div className="pointer-events-none w-full h-full flex flex-col justify-center items-center">
                <span className="font-bold text-[10px] leading-tight block truncate w-full px-1 text-slate-800">
                  {item.name}
                </span>
                
                {/* Visual indicator for larger items */}
                {(item.width > 50 && item.depth > 50) && (
                  <span className="text-[9px] text-slate-500 mt-0.5 scale-90">{item.width}x{item.depth}</span>
                )}
                
                {/* Warning Indicator */}
                {(item.isCollision || item.isWallViolation) && (
                  <div className="absolute top-0 right-0 p-0.5 text-red-600 bg-white/80 rounded-bl">
                    <AlertTriangle size={10} strokeWidth={3} />
                  </div>
                )}
                
                {/* Clearance visualizer (Front) */}
                 <div 
                   className="absolute bottom-0 left-0 w-full bg-yellow-400/30 pointer-events-none"
                   style={{ height: '3px' }}
                 />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="bg-white border-t p-2 text-[10px] text-gray-500 flex justify-between uppercase font-mono tracking-tight">
        <div>
          Room: {room.width} x {room.depth} cm
        </div>
        <div>
          Grid: 10cm
        </div>
      </div>
    </div>
  );
};
