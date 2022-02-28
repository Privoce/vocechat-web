// import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { Reset } from 'styled-reset';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'animate.css';
import ReduxRoutes from './routes';
import BASE_URL from './app/config';

ReactDOM.render(
 <>
  <Helmet>
   <link rel="icon" href={`${BASE_URL}/resource/organization/logo`} />
  </Helmet>
  <Reset />
  <Toaster />
  <DndProvider backend={HTML5Backend}>
   <ReduxRoutes />
  </DndProvider>
 </>,
 document.getElementById('root')
);
