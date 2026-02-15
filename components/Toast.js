import { motion, AnimatePresence } from 'framer-motion'

const Toast = ({ msg, handleShow, bgColor }) => {
    const getIcon = () => {
        if (bgColor === 'bg-danger') return '❌'
        if (bgColor === 'bg-success') return '✅'
        if (bgColor === 'bg-warning') return '⚠️'
        return 'ℹ️'
    }

    return (
        <AnimatePresence>
            <motion.div 
                className={`toast-custom ${bgColor}`}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <div className="toast-icon">{getIcon()}</div>
                <div className="toast-content">
                    <div className="toast-header-custom">
                        <strong>{msg.title}</strong>
                        <button 
                            type="button" 
                            className="toast-close"
                            onClick={handleShow}
                        >
                            ×
                        </button>
                    </div>
                    <div className="toast-body-custom">{msg.msg}</div>
                </div>

                <style jsx>{`
                    .toast-custom {
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        z-index: 9999;
                        min-width: 320px;
                        max-width: 400px;
                        display: flex;
                        align-items: flex-start;
                        gap: 12px;
                        padding: 16px;
                        border-radius: 12px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                        color: white;
                    }
                    
                    .bg-danger {
                        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    }
                    
                    .bg-success {
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    }
                    
                    .bg-warning {
                        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                    }
                    
                    .toast-icon {
                        font-size: 1.5rem;
                        flex-shrink: 0;
                    }
                    
                    .toast-content {
                        flex: 1;
                    }
                    
                    .toast-header-custom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 4px;
                    }
                    
                    .toast-header-custom strong {
                        font-size: 0.95rem;
                        font-weight: 600;
                    }
                    
                    .toast-close {
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.25rem;
                        line-height: 1;
                        transition: background 0.2s;
                    }
                    
                    .toast-close:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                    
                    .toast-body-custom {
                        font-size: 0.875rem;
                        opacity: 0.95;
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    )
}

export default Toast
