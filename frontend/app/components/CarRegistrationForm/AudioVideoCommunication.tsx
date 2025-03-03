import React from 'react';
import CheckboxList from '@/app/components/CarRegistrationForm/CheckboxList';
import { AudioVideoCommunication as AudioVideoCommunicationType } from '@/app/types/types';

interface AudioVideoCommunicationProps {
    formData: { audioVideoCommunication: AudioVideoCommunicationType };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AudioVideoCommunication: React.FC<AudioVideoCommunicationProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h1 className="text-[16px] mb-2 mt-2">AUDIO, VIDEO, KOMMUNIKATSIOON</h1>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.audioVideoCommunication} parent="audioVideoCommunication" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default AudioVideoCommunication;