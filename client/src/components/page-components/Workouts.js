import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import plansServices from '../../redux/features/plans/plansServices';
import Typography from '@mui/material/Typography';
import { Button, Container, Box } from '@mui/material';
import Exercise from './Exercise';

const Workouts = ({ id, token, currentId }) => {
    // Global State 
    const TrainingDayId = id
    const [plans, setplans] = useState([]);


    useEffect(async () => {
        const response = await plansServices.getAllPlans(id, token)
        setplans(response)
    }, []);
    // Loads in all workouts 
    // When creating a workout the page gets redirect to exercises page
    // user will have the ability to add a exercise from there
    // set the training day id being selected and save in Redux
    // return back to regiments page




    return (<>
        {plans.length === 0 ?

            <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "ceneter", alignItems: "center" }}>
                <Button sx={{ textAlign: "center" }} variant="contained"><Link href={{
                    pathname: "/dashboard/exercises",
                    query: { TrainingDayId: TrainingDayId, CurrentId: currentId },
                }} >Add Workout</Link></Button>
            </Container>

            :
            <>
                <Typography marginBottom={"1.125rem"} color={"secondary"} fontWeight={"bold"}>workouts: {plans.length}</Typography>
                {plans.map(({ name, equipment, muscle_target, bodyPart, id, imageUrl }) =>
                    <div key={id}>
                        <Box>
                            {/* Workout Details */}
                            <Exercise exercise={{ name, equipment, muscle_target, bodyPart, id, gifUrl: imageUrl }} display={'none'} />
                        </Box>
                    </div>
                )
                }
                <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "ceneter", alignItems: "center" }}>
                    <Button sx={{ textAlign: "center" }} variant="contained"><Link href={{
                        pathname: "/dashboard/exercises",
                        query: { TrainingDayId: TrainingDayId, CurrentId: currentId },
                    }} >Add Workout</Link></Button>
                </Container>
            </>




        }


    </>);
}

export default Workouts;
