import React from 'react';
import {
    Redirect,
    Route,
    Switch,
    useRouteMatch
  } from 'react-router-dom';
import ContactFaQ from '../pages/ContactFaQ';
import ContactHelpline from '../pages/ContactHelpline';
import ContactMessage from '../pages/ContactMessage';

const ContactRouter = () => {
    const { path, url } = useRouteMatch();
    console.log(path, url);

    return (
        <Switch>
            <Route exact path={ `${path}/faq` }>
                <ContactFaQ/>
            </Route>
            <Route exact path={ `${path}/helpline` }>
                <ContactHelpline/>
            </Route>
            <Route exact path={ `${path}/discounts` }>
                <ContactMessage/>
            </Route>
            <Route path={ path }>
                <Redirect to={{
                    pathname: `${path}/faq`
                }}/>
            </Route>
        </Switch>
    );
};

export default ContactRouter;