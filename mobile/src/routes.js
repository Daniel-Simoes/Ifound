import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title:'iFound'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title:"GitHub's Profile"
            }
        },
    },{
        defaultNavigationOptions: {
            headerTitleAlign: 'center',
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#ec5353'
            },
        },
    })
);

export default Routes;
