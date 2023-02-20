import MuiSkeleton from '@mui/material/Skeleton'

const Skeleton = ({ width = '100%', height = '100%', variant = 'rounded', color }) => {
  return (
    <MuiSkeleton variant={variant} width={width} height={height} sx={{ backgroundColor: color }} />
  )
}

export default Skeleton
