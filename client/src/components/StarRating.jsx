import { useState } from 'react';
import { HiStar } from 'react-icons/hi2';
import { motion } from 'framer-motion';

export default function StarRating({ rating = 0, onRate, readonly = false, size = 'md' }) {
  const [hover, setHover] = useState(0);

  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const handleClick = (value) => {
    if (!readonly && onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-colors`}
        >
          <HiStar
            className={`${sizes[size]} ${
              star <= (hover || rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-600'
            }`}
          />
        </motion.button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-slate-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
