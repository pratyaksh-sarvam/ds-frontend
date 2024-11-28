// import React, { useEffect, useState } from 'react'
// import LoadingAnimation from "../assets/loader.svg"
// import { betterAxios } from "../api/axios";
// import { SAMPLE_DATA } from './data';
// import ReactPaginate from 'react-paginate';
// import RowElement from './RowElement';
// import HeaderWithFilter from './HeaderWithFilter';

// const Viewer = ({ inputData }) => {
//     console.log(inputData);

//     const [loading, setLoading] = useState(true);
//     const [totalPages, setTotalPages] = useState(0);
//     const [totalRows, setTotalRows] = useState(0);
//     const [totalColumns, setTotalColums] = useState(0);
//     const [currPage, setCurrPage] = useState(1);
//     const [pageSize, setPageSize] = useState(10);
//     const [columns, setColumns] = useState(null);
//     const [data, setData] = useState([]);
//     const [filterable_columns, setFilterableCols] = useState({});
//     const [showFilterUI, setShowFilterUI] = useState([]);
//     const [appliedFilters, setAppliedFilters] = useState([]);

//     const handleShowFilterUI = (ind) => {
//         console.log(ind)
//         setShowFilterUI(showFilterUI.map((v, ind2) => ind == ind2 ? v == 1 ? 0 : 1 : 0));
//     }

//     const fetchTableData = async (filters = []) => {
//         await betterAxios.post("api/v1/dataset/load", {
//             "file_path": inputData.file_path,
//             "page": currPage,
//             "page_size": pageSize,
//             filters
//         }).then((res) => {
//             setData(res.data?.data || []);
//             setColumns(res.data?.columns);
//             setTotalPages(res.data?.total_pages);
//             setTotalRows(res.data?.total_rows);
//             setTotalColums(res?.data?.columns.length);
//             generateFilters(res?.data?.filterable_columns);
//             setShowFilterUI(res?.data?.columns?.map((_, i) => 0));
//             setLoading(false);
//         })
//     }

//     const DataTable = () => (
//         <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
//             <table className="w-full text-left table-auto">
//                 <thead>
//                     <tr>
//                         {columns?.map((col, ind) => (
//                             <HeaderWithFilter 
//                                 handleFilterApply={handleFilterApply}
//                                 handleShowFilterUI={handleShowFilterUI}
//                                 showFilterUI={showFilterUI[ind]}
//                                 ind={ind}
//                                 filters={filterable_columns[col.name]}
//                                 col={col}
//                                 key={ind}
//                             />
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data?.map((row, ind) => (
//                         <RowElement key={ind} columns={columns} row={row} />
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );

    

//     const generateFilters = (filterData) => {
//         if (!filterData) return;
//         let fil = {};
//         for (var i = 0; i < filterData.length; i++) {
//             const d = filterData[i];
//             fil[d.name] = {
//                 type: d.filter_type,
//                 max: d.max_value,
//                 min: d.min_value,
//                 options: d.unique_values
//             }
//         }
//         setFilterableCols(fil);
//     }

//     // Helper function to format filter values
//     const getFilterDisplayValue = (filter) => {
//         const column = columns?.find(col => col.name === filter.column);
//         if (!column) return filter.value;

//         switch (filter.operator) {
//             case 'eq': return `equals ${filter.value}`;
//             case 'ne': return `not equals ${filter.value}`;
//             case 'gt': return `greater than ${filter.value}`;
//             case 'lt': return `less than ${filter.value}`;
//             default: return filter.value;
//         }
//     };

//     const loadSampleData = () => {
//         const res = { data: SAMPLE_DATA }
//         setData(res.data?.data || []);
//         setColumns(res.data?.columns);
//         setTotalPages(res.data?.total_pages);
//         setTotalRows(res.data?.total_rows);
//         setTotalColums(res?.data?.columns.length);
//         generateFilters(res?.data?.filterable_columns);
//         setShowFilterUI(res?.data?.columns?.map((_, i) => 0));
//         setLoading(false);
//     }

//     useEffect(() => {
//         if (inputData) {
//             setLoading(true);
//             fetchTableData(appliedFilters);
//         }
//     }, [inputData, currPage, appliedFilters]);

//     const handlePageClick = (p) => {
//         const newPage = p.selected + 1;
//         setCurrPage(newPage);
//     };

//     const handleFilterApply = (data) => {
//         let finalFilters = [...appliedFilters];
//         const ind = appliedFilters.findIndex((fil) => fil.column === data.column);

//         if (ind !== -1) {
//             finalFilters[ind] = data;
//         } else {
//             finalFilters = [...finalFilters, data];
//         }

//         setAppliedFilters(finalFilters);
//         setCurrPage(1);
//     };

//     const DetailedDatasetStats = () => (
//         <div className="w-full bg-n-8/50 rounded-xl p-6 mb-6">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-color-2">Dataset Statistics</h2>
//                 <span className="text-sm text-n-2">
//                     Showing page {currPage} of {totalPages}
//                 </span>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className="bg-n-6 rounded-lg p-4">
//                     <div className="text-n-2 text-sm mb-1">Total Rows</div>
//                     <div className="text-2xl font-bold text-color-1">
//                         {totalRows.toLocaleString()}
//                     </div>
//                 </div>
                
//                 <div className="bg-n-6 rounded-lg p-4">
//                     <div className="text-n-2 text-sm mb-1">Total Columns</div>
//                     <div className="text-2xl font-bold text-color-1">
//                         {totalColumns}
//                     </div>
//                 </div>
                
//                 <div className="bg-n-6 rounded-lg p-4">
//                     <div className="text-n-2 text-sm mb-1">Rows per Page</div>
//                     <div className="text-2xl font-bold text-color-1">
//                         {pageSize}
//                     </div>
//                 </div>
                
//                 <div className="bg-n-6 rounded-lg p-4">
//                     <div className="text-n-2 text-sm mb-1">Active Filters</div>
//                     <div className="text-2xl font-bold text-color-1">
//                         {appliedFilters.length}
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-4 bg-n-6 rounded-lg p-4">
//                 <div className="text-n-2 text-sm mb-2">Column Details</div>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//                     {columns?.map((col, index) => (
//                         <div key={index} className="text-sm">
//                             <span className="text-color-2">{col.name}</span>
//                             <span className="text-n-2 ml-1">({col.type})</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );

//     if (!inputData) return;

//     return (
//         <>
//             {loading ? (
//                 <div className='w-[50px] h-[50px]'>
//                     <img src={LoadingAnimation} alt="Loading data" />
//                 </div>
//             ) : (
//                 <div className='max-w-[1500px] w-full mx-auto px-[6rem]'>
//                     <DetailedDatasetStats />
//                     <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
//                         <table className="w-full text-left table-auto">
//                             <thead>
//                                 <tr>
//                                     {columns?.map((col, ind) => {
//                                         return <HeaderWithFilter 
//                                             handleFilterApply={handleFilterApply}
//                                             handleShowFilterUI={handleShowFilterUI}
//                                             showFilterUI={showFilterUI[ind]}
//                                             ind={ind}
//                                             filters={filterable_columns[col.name]}
//                                             col={col}
//                                             key={ind}
//                                         />
//                                     })}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data?.map((row, ind) => {
//                                     return <RowElement key={ind} columns={columns} row={row} />
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
                    
//                     <div className="flex justify-between items-center px-4 py-3">
//                         <div className="text-sm text-slate-500">
//                             Showing <b>{data.length}</b> of {totalRows}
//                         </div>
//                         <div className="flex space-x-1">
//                             <ReactPaginate
//                                 breakLabel="..."
//                                 nextLabel="Next >"
//                                 onPageChange={handlePageClick}
//                                 pageRangeDisplayed={4}
//                                 pageCount={totalPages}
//                                 previousLabel="< Previous"
//                                 forcePage={currPage - 1}
//                                 className='flex flex-row items-center justify-center space-x-2 overflow-hidden'
//                                 pageClassName="border h-[40px] w-[40px] text-center items-center justify-center inline-flex rounded-md"
//                                 nextClassName='pl-2'
//                                 previousClassName='pr-2'
//                                 activeClassName="bg-white text-black"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default Viewer


import React, { useEffect, useState } from 'react'
import LoadingAnimation from "../assets/loader.svg"
import { betterAxios } from "../api/axios";
import ReactPaginate from 'react-paginate';
import RowElement from './RowElement';
import HeaderWithFilter from './HeaderWithFilter';

const Viewer = ({ inputData }) => {
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [totalColumns, setTotalColums] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [columns, setColumns] = useState(null);
    const [data, setData] = useState([]);
    const [filterable_columns, setFilterableCols] = useState({});
    const [showFilterUI, setShowFilterUI] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState([]);

    // Helper function to format filter values
    const getFilterDisplayValue = (filter) => {
        const column = columns?.find(col => col.name === filter.column);
        if (!column) return filter.value;
    
        switch (filter.operator) {
            case 'eq': return `equals ${filter.value}`;
            case 'ne': return `not equals ${filter.value}`;
            case 'gt': return `greater than ${filter.value}`;
            case 'lt': return `less than ${filter.value}`;
            case 'ge': return `greater than or equal to ${filter.value}`;
            case 'le': return `less than or equal to ${filter.value}`;
            case 'contains': return `contains "${filter.value}"`;
            case 'not_contains': return `does not contain "${filter.value}"`;
            case 'starts_with': return `starts with "${filter.value}"`;
            case 'ends_with': return `ends with "${filter.value}"`;
            case 'is_null': return `is empty`;
            case 'is_not_null': return `is not empty`;
            case 'between': return `between ${filter.value[0]} and ${filter.value[1]}`;
            default: return filter.value;
        }
    };

    const handleShowFilterUI = (ind) => {
        setShowFilterUI(showFilterUI.map((v, ind2) => ind === ind2 ? v === 1 ? 0 : 1 : 0));
    }

    const fetchTableData = async (filters = []) => {
        try {
            const response = await betterAxios.post("api/v1/dataset/load", {
                "file_path": inputData.file_path,
                "page": currPage,
                "page_size": pageSize,
                filters
            });
            
            const responseData = response.data;
            setData(responseData.data || []);
            setColumns(responseData.columns);
            setTotalPages(responseData.total_pages);
            setTotalRows(responseData.total_rows);
            setTotalColums(responseData.columns.length);
            generateFilters(responseData.filters); // Update to use the filters from response
            setShowFilterUI(responseData.columns?.map(() => 0));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const generateFilters = (filterData) => {
        if (!filterData) return;
        let fil = {};
        filterData.forEach(filter => {
            fil[filter.column] = {
                type: filter.type,
                unique_values: filter.unique_values,
                operators: filter.operators
            };
        });
        setFilterableCols(fil);
    };

    const handlePageClick = (p) => {
        const newPage = p.selected + 1;
        setCurrPage(newPage);
    }

    const handleRemoveFilter = (indexToRemove) => {
        const newFilters = appliedFilters.filter((_, index) => index !== indexToRemove);
        setAppliedFilters(newFilters);
        fetchTableData(newFilters);
    };

    const handleClearAllFilters = () => {
        setAppliedFilters([]);
        fetchTableData([]);
    };

    const handleFilterApply = (data) => {
        let finalFilters = [...appliedFilters];
        const ind = appliedFilters.findIndex((fil) => fil.column === data.column);

        if (ind !== -1) {
            finalFilters[ind] = data;
        } else {
            finalFilters = [...finalFilters, data];
        }

        setAppliedFilters(finalFilters);
        setCurrPage(1); // Reset to first page when applying new filters
        fetchTableData(finalFilters);
    };

    const DetailedDatasetStats = () => (
        <div className="w-full bg-n-8/50 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-color-2">Dataset Statistics</h2>
                <span className="text-sm text-n-2">
                    Showing page {currPage} of {totalPages}
                </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-n-6 rounded-lg p-4">
                    <div className="text-n-2 text-sm mb-1">Total Rows</div>
                    <div className="text-2xl font-bold text-color-1">
                        {totalRows.toLocaleString()}
                    </div>
                </div>
                
                <div className="bg-n-6 rounded-lg p-4">
                    <div className="text-n-2 text-sm mb-1">Total Columns</div>
                    <div className="text-2xl font-bold text-color-1">
                        {totalColumns}
                    </div>
                </div>
                
                <div className="bg-n-6 rounded-lg p-4">
                    <div className="text-n-2 text-sm mb-1">Rows per Page</div>
                    <div className="text-2xl font-bold text-color-1">
                        {pageSize}
                    </div>
                </div>
                
                <div className="bg-n-6 rounded-lg p-4">
                    <div className="text-n-2 text-sm mb-1">Average Duration</div>
                    <div className="text-2xl font-bold text-color-1">
                        {filterable_columns?.duration?.unique_values?.mean?.toFixed(2) || 0} sec
                    </div>
                    <div className="text-xs text-n-2 mt-1">
                        Range: {filterable_columns?.duration?.unique_values?.min?.toFixed(2) || 0} - 
                        {filterable_columns?.duration?.unique_values?.max?.toFixed(2) || 0} sec
                    </div>
                </div>
            </div>
    
            {/* Applied Filters section */}
            {appliedFilters.length > 0 && (
                <div className="mt-4 bg-n-6 rounded-lg p-4">
                    <div className="text-n-2 text-sm mb-2">Applied Filters</div>
                    <div className="flex flex-wrap gap-2">
                        {appliedFilters.map((filter, index) => (
                            <div 
                                key={index} 
                                className="inline-flex items-center gap-2 bg-n-7 rounded-lg px-3 py-2"
                            >
                                <span className="text-color-2 font-medium">
                                    {filter.column}
                                </span>
                                <span className="text-n-2">
                                    {getFilterDisplayValue(filter)}
                                </span>
                                <button 
                                    onClick={() => handleRemoveFilter(index)}
                                    className="ml-2 text-n-2 hover:text-color-3"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={handleClearAllFilters}
                            className="text-sm text-color-3 hover:text-color-2 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}
    
            {/* Column Details section */}
            <div className="mt-4 bg-n-6 rounded-lg p-4">
                <div className="text-n-2 text-sm mb-2">Column Details</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {columns?.map((col, index) => (
                        <div key={index} className="text-sm">
                            <span className="text-color-2">{col.name}</span>
                            <span className="text-n-2 ml-1">({col.type})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        if (inputData) {
            setLoading(true);
            fetchTableData(appliedFilters);
        }
    }, [inputData, currPage]);

    if (!inputData) return;

    return (
        <>
            {loading ? (
                <div className='w-[50px] h-[50px]'>
                    <img src={LoadingAnimation} alt="Loading..." />
                </div>
            ) : (
                <div className='max-w-[1500px] w-full mx-auto px-[6rem]'>
                    <DetailedDatasetStats />

                    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr>
                                {columns?.map((col, ind) => (
                                    <HeaderWithFilter 
                                        key={ind}
                                        handleFilterApply={handleFilterApply} 
                                        handleShowFilterUI={handleShowFilterUI} 
                                        showFilterUI={showFilterUI[ind]} 
                                        ind={ind} 
                                        filters={filterable_columns[col.name]} 
                                        col={col} 
                                        appliedFilters={appliedFilters}
                                    />
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((row, ind) => {
                                    return <RowElement key={ind} columns={columns} row={row} />
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center px-4 py-3">
                        <div className="text-sm text-slate-500">
                            Showing <b>{data.length}</b> of {totalRows}
                        </div>
                        <div className="flex space-x-1">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next →"
                                previousLabel="← Previous"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={4}
                                pageCount={totalPages}
                                forcePage={currPage - 1}
                                className="flex items-center justify-center gap-2"
                                pageClassName="border h-[40px] w-[40px] text-center items-center justify-center inline-flex rounded-md"
                                nextClassName='pl-2'
                                previousClassName='pr-2'
                                activeClassName="bg-white text-black"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Viewer;
