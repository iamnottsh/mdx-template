import {Box, Button, Typography} from '@mui/material'

export default function Home() {
  return (
    <Box my={12} textAlign="center">
      <Typography variant="h2" paragraph>有效流手册</Typography>
      <Typography variant="subtitle2" paragraph>基础社交技能缺失问题标准修复手册</Typography>
      <Box sx={{'& .MuiButton-root': {mx: 1}}}>
        <Button size="large" variant="contained" href="learn">开始学习</Button>
        <Button size="large" variant="outlined" href="https://github.com/iamnottsh/mdx-template" target="_blank" rel="noreferrer">Github</Button>
      </Box>
    </Box>
  )
}
