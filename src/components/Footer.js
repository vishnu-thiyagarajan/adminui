import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
}
export default function CustomFooterComponent(props) {
    return (
    <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        p={2}
      >
    
      <Button
        color="error"
        variant='contained'
        size="small"
        onClick={props.deleteSelected}
      >
        Delete {props.selectionModel.length} Rows Selected
      </Button>
      <CustomPagination />
    </Stack>
    );
  }