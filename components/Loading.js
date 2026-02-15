import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.div 
      className="loading-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="loading-content">
        <div className="loading-spinner">
          <motion.div 
            className="spinner-ring"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="spinner-ring spinner-ring-inner"
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
        <motion.p 
          className="loading-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Loading...
        </motion.p>
      </div>
      
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        
        .loading-spinner {
          position: relative;
          width: 60px;
          height: 60px;
        }
        
        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-top-color: #3b82f6;
          border-radius: 50%;
        }
        
        .spinner-ring-inner {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border-top-color: #60a5fa;
          border-bottom-color: #93c5fd;
        }
        
        .loading-text {
          color: white;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          margin: 0;
        }
      `}</style>
    </motion.div>
  );
};

export default Loading;
