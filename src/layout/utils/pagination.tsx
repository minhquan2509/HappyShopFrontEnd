import React from "react";

interface PaginationInterface {
    pageMoment: number;
    totalPage: number;
    pagination: any
}

export const Pagination: React.FC<PaginationInterface> = (props) => {

    const listPage = [];
    if (props.pageMoment == 1) {
        listPage.push(props.pageMoment);
        if (props.totalPage >= props.pageMoment + 1) {
            listPage.push(props.pageMoment + 1);
        }
        if (props.totalPage >= props.pageMoment + 2) {
            listPage.push(props.pageMoment + 2);
        }
    } else if (props.pageMoment > 1) {
        //trang -2
        if (props.pageMoment >= 3) {
            listPage.push(props.pageMoment - 2);
        }
        //trang -1
        if (props.totalPage >= 2) {
            listPage.push(props.pageMoment - 1);
        }
        //ban than no
        listPage.push(props.pageMoment);
        //trang +1
        if (props.totalPage >= props.pageMoment + 1) {
            listPage.push(props.pageMoment + 1);
        }
        //trang +2
        if (props.totalPage >= props.pageMoment + 2) {
            listPage.push(props.pageMoment + 2);
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={()=>props.pagination(1)}>
                   <button className="page-link">
                    FirstPage
                    </button>
                </li>
                    {
                        listPage.map(page=> (
                            <li className="page-item" key={page} onClick={()=>props.pagination(page)}>
                            <button className={"page-link " + (props.pageMoment===page?"active":"") }>
                             {page}
                             </button>
                         </li>
                        ))
                    }
                <li className="page-item" onClick={()=>props.pagination(props.totalPage)}>
                    <button className="page-link">
                    LastPage
                        </button>
                </li>
            </ul>
        </nav>
    )
}