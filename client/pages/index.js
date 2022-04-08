import Hero from '../src/components/hero'
import { FaSearch, FaFilter, FaPlus } from 'react-icons/fa'
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";

export default function Home() {

  return (
    <>
      <Hero />
      {/* About Us */}


      <Box sx={{ height: '30vh', marginTop: '10px', padding: '2rem' }}>
        <Typography variant="h3" component="h2" >
          About Us
        </Typography>
        <Typography variant="subtitle1">
          <p>Exercise app is an all inclusive exercise application that is allows our users to create workout plans based on their specific targeted goals. Our goal is to help you reach your goal.  </p>
        </Typography>
      </Box>



      {/* Product Features */}

      <Box component="section" sx={{ padding: '20px', backgroundColor: "#292929" }} >
        <Typography variant="h3" component="h2" sx={{ marginBottom: '20px' }}>
          Features
        </Typography>
        <Box variant="article" sx={{ display: { xs: 'grid', } }} >
          <Box sx={{ display: { xs: "flex", }, flexDirection: 'column', alignItems: "center" }}>
            <FaFilter className="icon" />
            <h3>Developing Workout Plans</h3>
            <p>Create your own unique workout plan that fits your exerperience level!</p>
          </Box>
          {/* Viewing over 1300+ */}
          <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center" }} component="article">
            <FaSearch className="icon" />
            <h3>Viewing over 1300+ exercise</h3>
            <p>Exercise app hold a wide variety of workouts that target all muscle groups!</p>
          </Box>
          {/* Personal Goals */}
          <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center" }} component="article">
            <FaPlus className="icon" />
            <h3>Create Personal Goals</h3>
            <p>Exercise apps allow user to create their personal goal!</p>
          </Box>
        </Box>
      </Box>
    </>
  )
}
