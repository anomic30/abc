import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";

import {
  RocketLaunchIcon
} from "@heroicons/react/24/outline";

import { sidebarRoutes } from "./routes.js";

const Sidebar = () => {
  return (
    <Card className="h-[calc(100vh-0rem)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" className='text-appBlue font-bold'>
          abc firm
        </Typography>
      </div>
      <List className='min-w-0'>
        {sidebarRoutes.map((route) => {
          return (
            <ListItem className='hover:bg-blue-50' key={route.name}>
              <ListItemPrefix>
                <route.icon className="h-5 w-5 stroke-black" />
              </ListItemPrefix>
              <Typography variant="paragraph" color="black" className='text-sm font-medium'>
                {route.name}
              </Typography>
            </ListItem>
          )
        })}
      </List>
      <Card className="mt-auto text-center bg-blue-50 p-4">
        <RocketLaunchIcon className="m-auto h-5 w-5 stroke-appBlue"/>
          <Typography variant="h6" className="my-4 text-sm text-black" >
            Upgrade Account
          </Typography>
          <Typography variant="small" className="font-normal opacity-90 text-[11px]">
            Access to Unlimited Transcription 
          </Typography>
          <div className="mt-4 flex gap-3">
            <Button className='w-full normal-case text-sm bg-appBlue'>Upgrade</Button>
          </div>
      </Card>
    </Card>
  )
}

export default Sidebar