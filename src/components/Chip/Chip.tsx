import React from 'react';
import styles from './Chip.module.scss';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ label, selected = false, onClick, className = '' }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.chip} ${selected ? styles.selected : ''} ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
