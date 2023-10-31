import { Box, Skeleton } from "@mui/material";

export const SkeletonDashboardLoader = ({ count = 4, width = "100%", height = "35vh", maxWidth = "350px" }) => (
    <>
        {Array.from(new Array(count)).map((_, index) => (
            <Box
                key={index}
                sx={{
                    flex: '0 0 auto',
                    width: width,
                    maxWidth: maxWidth,
                    height: height,
                    m: 1,
                    borderRadius: 2
                }}
            >
                <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
        ))}
    </>
);
