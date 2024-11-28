// import React, { useState } from 'react'
// import AudioPlayer from './AudioPlayer';

// const RowElement = ({ columns, row }) => {
//     const [expand, setExpand] = useState(false);

//     const handleExpand = () => {
//         setExpand(!expand);
//     }

//     return (
//         <tr className="hover:bg-slate-50 border-b border-slate-200 cursor-grabbing" onClick={handleExpand}>
//             {Object.keys(row).map((val, ind) => {
//                 return (<td key={ind} className="pr-7 pl-4 py-3">
//                     {columns?.filter((col, _) => col.name == val && col.type == "audio").length ?
//                         <div className="w-full h-full text-sm text-slate-700"><AudioPlayer path={row[val]} /></div>
//                         : columns?.filter((col, _) => col.name == val && col.type == "image").length ?
//                             <p className="block text-sm text-slate-700">{"Image"}</p>
//                             : columns?.filter((col, _) => col.name == val && col.type == "video").length ?
//                                 <p className="block text-sm text-slate-700">{"Video"}</p>
//                                 :
//                                 <p className={`text-sm text-slate-700 ${expand ? "" : "line-clamp-2"}`}>{row[val]}</p>}
//                 </td>)
//             })}
//         </tr>
//     )
// }

// export default RowElement



import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RowElement = ({ columns, row }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopyToClipboard = async (value, fieldName) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedField(fieldName);
            toast.success('Copied to clipboard!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
            });
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            toast.error('Failed to copy!');
        }
    };

    const handleRowClick = () => {
        setIsExpanded(!isExpanded);
    };

    const renderCellContent = (value, col) => {
        switch (col.type) {
            case 'audio':
                return <AudioPlayer path={value} />;
            
            case 'image':
                return <p className="text-sm text-slate-700">{"Image"}</p>;
            
            case 'video':
                return <p className="text-sm text-slate-700">{"Video"}</p>;
                
            case 'string':
                // Adjust width based on column name
                const isLongTextColumn = ['text', 'translation', 'reference_text'].includes(col.name);
                return (
                    <p className={`text-sm text-slate-700 ${isExpanded ? '' : 'line-clamp-2'} 
                        ${isLongTextColumn ? 'min-w-[300px] max-w-[500px]' : ''}`}>
                        {value}
                    </p>
                );

            default:
                return <span className="text-sm text-slate-700">{value}</span>;
        }
    };

    return (
        <tr
            onClick={handleRowClick}
            className={`
                border-b border-slate-200
                transition-shadow duration-200 
                hover:bg-slate-50/50 hover:shadow-[0_2px_8px_rgba(202, 191, 191, 0.08)]
                ${isExpanded ? 'bg-slate-50/80' : ''}
            `}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
        >
            {columns?.map((col, index) => {
                const fieldName = col.name;
                const value = row[fieldName];
                
                return (
                    <td key={index} className="relative p-4">
                        <div className="flex items-center gap-2 group">
                            <div className="flex-grow">
                                {renderCellContent(value, col)}
                            </div>

                            {isHovered && col.type !== 'audio' && (
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopyToClipboard(value, fieldName);
                                        }}
                                        className="p-1 rounded hover:bg-slate-200 transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        {copiedField === fieldName ? (
                                            <FiCheck className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <FiCopy className="w-4 h-4 text-slate-500" />
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </td>
                );
            })}
        </tr>
    );
};

RowElement.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })).isRequired,
    row: PropTypes.object.isRequired
};

export default RowElement;