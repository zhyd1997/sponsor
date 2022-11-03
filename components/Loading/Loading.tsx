import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const Loading = () => {
  return (
    <Stack spacing={1} alignItems="center">
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rounded" width={60} height={40} />
    </Stack>
  );
}
