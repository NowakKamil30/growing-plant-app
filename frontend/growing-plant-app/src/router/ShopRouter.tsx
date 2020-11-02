import React from 'react';
import {
    Route,
    Switch,
    useRouteMatch
  } from 'react-router-dom';
import Error404 from '../pages/Error404';
import Shop from '../pages/Shop';
import ShopBasket from '../pages/ShopBasket';
import ShopDiscounts from '../pages/ShopDiscounts';
import ShopNewReleases from '../pages/ShopNewReleases';

const ShopRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={ path }>
                <Shop/>
            </Route>
            <Route exact path={ `${path}/new-releases` }>
                <ShopNewReleases/>
            </Route>
            <Route exact path={ `${path}/basket` }>
                <ShopBasket/>
            </Route>
            <Route exact path={ `${path}/discounts` }>
                <ShopDiscounts/>
            </Route>
            <Route path='*'>
                <Error404/>
            </Route>
        </Switch>
    );
};

export default ShopRouter;