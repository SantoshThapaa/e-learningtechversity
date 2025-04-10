// pages/resources.js
import { useState } from 'react';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const ResourcesPage = () => {
    const [titles, setTitles] = useState([
        { id: 1, name: 'Title 1', subHeadings: ['Sub-heading 1', 'Sub-heading 2', 'Sub-heading 3'] },
        { id: 2, name: 'Title 2', subHeadings: ['Sub-heading 1', 'Sub-heading 2'] }
    ]);

    // Function to handle adding a new title (you can expand this functionality)
    const handleAddTitle = () => {
        setTitles([
            ...titles,
            { id: titles.length + 1, name: `Title ${titles.length + 1}`, subHeadings: [] },
        ]);
    };

    // Function to handle edit
    const handleEdit = (titleId) => {
        // Logic to handle editing the title
        alert(`Editing Title ID: ${titleId}`);
    };

    // Function to handle delete
    const handleDelete = (titleId) => {
        setTitles(titles.filter((title) => title.id !== titleId));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Title Section */}
            <div className="mb-6 flex justify-between items-center relative">
                {/* <h1 className="text-2xl font-semibold">Resources</h1> */}
                <div className="flex justify-end mt-6 right-1 absolute">
                    <button className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-colors">
                        Save
                    </button>
                </div>
            </div>

            {/* Titles with Sub-headings */}
            {titles.map((title) => (
                <div key={title.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                    {/* Title Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-green-700">{title.name}</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleEdit(title.id)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <HiOutlinePencil />
                            </button>
                            <button
                                onClick={() => handleDelete(title.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <HiOutlineTrash />
                            </button>
                        </div>
                    </div>

                    {/* Sub-headings */}
                    {title.subHeadings.length > 0 ? (
                        <div className="space-y-2">
                            {title.subHeadings.map((subHeading, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <p className="text-sm text-gray-700">{subHeading}</p>
                                    <div className="flex space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <HiOutlinePencil />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No sub-headings available</p>
                    )}
                </div>
            ))}

            {/* Save Button */}
            <button
                onClick={handleAddTitle}
                className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-colors justify-end"
            >
                <HiOutlinePlus className="text-xl" />
                Add Title
            </button>

        </div>
    );
};

export default ResourcesPage;
