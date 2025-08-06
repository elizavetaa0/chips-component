import React, { useState, useEffect } from 'react';
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/react';
import styles from './Chips.module.scss';
import { Chip } from '..';

interface ChipsProps {
  items: string[];
  selectedItem?: string;
  onSelect?: (item: string | undefined) => void;
  className?: string;
}

export const Chips: React.FC<ChipsProps> = ({ items, selectedItem, onSelect, className = '' }) => {
  const MAX_VISIBLE_CHIPS = 7;
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const newVisibleItems = items.slice(0, MAX_VISIBLE_CHIPS);
    const newHiddenItems = items.slice(MAX_VISIBLE_CHIPS);
    setVisibleItems(newVisibleItems);
    setHiddenItems(newHiddenItems);
  }, [items]);

  const handleItemClick = (item: string) => {
    if (onSelect) {
      onSelect(item === selectedItem ? undefined : item);
    }
  };

  const togglePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {visibleItems.map((item) => (
        <Chip
          key={item}
          label={item}
          selected={item === selectedItem}
          onClick={() => handleItemClick(item)}
        />
      ))}

      {hiddenItems.length > 0 && (
        <div className={styles.moreContainer}>
          <Chip
            ref={refs.setReference}
            label={`+${hiddenItems.length}`}
            onClick={togglePopup}
            className={styles.moreButton}
          />

          {isOpen && (
            <div ref={refs.setFloating} style={floatingStyles} className={styles.popup}>
              <div className={styles.popupContent}>
                {hiddenItems.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    selected={item === selectedItem}
                    onClick={() => {
                      handleItemClick(item);
                      setIsOpen(false);
                    }}
                    className={styles.popupChip}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
