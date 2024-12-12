// src/components/Common/ConfirmDialog.tsx
import React from 'react';
import '../../styles/global.css';

interface ConfirmDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
    isOpen, 
    onConfirm, 
    onCancel, 
    title, 
    message 
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="btn-confirm" onClick={onConfirm}>Confirm</button>
                    <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;