import PropTypes from "prop-types";

function Pagination({ pageInfo, getProducts }) {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className={pageInfo.has_pre ? "page-link" : "page-link disabled"}
              onClick={() => {
                getProducts(pageInfo.current_page - 1);
              }}
            >
              Previous
            </a>
          </li>

          {Array.from(Array(pageInfo.total_pages).keys()).map((page, index) => {
            return (
              <>
                <li className="page-item" key={index}>
                  <a
                    className={
                      pageInfo.current_page === index + 1
                        ? "page-link active"
                        : "page-link "
                    }
                    onClick={() => {
                      getProducts(index + 1);
                    }}
                  >
                    {index + 1}
                  </a>
                </li>
              </>
            );
          })}

          <li className="page-item">
            <a
              className={
                pageInfo.has_next ? "page-link " : "page-link disabled "
              }
              onClick={() => {
                getProducts(pageInfo.current_page + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
Pagination.propTypes = {
  pageInfo: PropTypes.object,
  getProducts: PropTypes.func,
};
