
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    Account Services

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

import BaseService from '../../../_lib/BaseService';
import Dispatcher from '../../../_lib/Dispatcher';
import AccountEvents from '../../events/AccountEvents';
import FirebaseCodes from '../../constants/FirebaseCodes';
import NotificationTypes from '../../constants/NotificationTypes';

/**
 *  Account Services
 */
class AccountServices extends BaseService {

    constructor (args) {
        super(args);
    }

    createAccount (email, password) {
        Dispatcher.dispatch({
            event: AccountEvents.ACCOUNT_CREATION_STARTED
        });

        this._DB.createUser({ email, password }, (error, userData) => {
            if (error) {
                switch (error.code) {
                    case FirebaseCodes.INVALID_EMAIL:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_CREATION_FAILED,
                            data: {
                                field: 'email',
                                message: 'Specified email is invalid.'
                            }
                        });
                        break;
                    case FirebaseCodes.EMAIL_TAKEN:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_CREATION_FAILED,
                            data: {
                                field: 'email',
                                message: 'Specified email is already in use.'
                            }
                        });
                        break;
                    case FirebaseCodes.INVALID_PASSWORD:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_CREATION_FAILED,
                            data: {
                                field: 'password',
                                message: 'Specified password is invalid.'
                            }
                        });
                        break;
                    case FirebaseCodes.NETWORK_ERROR:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_CREATION_FAILED,
                            data: {
                                field: null,
                                message: 'You are currently offline. Please check your internet connection.'
                            },
                            __notification: {
                                type: NotificationTypes.WARNING,
                                title: 'Offline',
                                message: 'You are currently offline. Please check your internet connection.'
                            }
                        });
                        break;
                    default:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_CREATION_FAILED,
                            data: {
                                field: null,
                                message: 'Unknown error occured.'
                            },
                            __notification: {
                                type: NotificationTypes.ERROR,
                                title: 'Unknown error',
                                message: 'Unknown error occured.'
                            }
                        });
                }
            } else {
                Dispatcher.dispatch({
                    event: AccountEvents.ACCOUNT_CREATED,
                    data: {
                        field: null,
                        data: userData,
                        message: 'Your account has been successfully created.'
                    }
                });
            }
        });
    }

    changeAccountEmail (oldEmail, newEmail, password) {
        console.log('Change account email:', oldEmail, newEmail, password); // eslint-disable-line
    }

    changeAccountPassword (email, oldPassword, newPassword) {
        console.log('Change account password:', email, password, newPassword); // eslint-disable-line
    }

    resetAccountPassword (email) {
        Dispatcher.dispatch({
            event: AccountEvents.ACCOUNT_PASSWORD_RESET_STARTED
        });

        this._DB.resetPassword({ email }, error => {
            if (error) {
                switch (error.code) {
                    case FirebaseCodes.INVALID_USER:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_PASSWORD_RESET_FAILED,
                            data: {
                                field: 'email',
                                message: 'Account with specified email does not exists.'
                            }
                        });
                        break;
                    case FirebaseCodes.ROUTE_NOT_FOUND:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_PASSWORD_RESET_FAILED,
                            data: {
                                field: 'email',
                                message: 'Account with specified email does not exists.'
                            }
                        });
                        break;
                    case FirebaseCodes.NETWORK_ERROR:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_PASSWORD_RESET_FAILED,
                            data: {
                                field: null,
                                message: 'You are currently offline. Please check your internet connection.'
                            },
                            __notification: {
                                type: NotificationTypes.WARNING,
                                title: 'Offline',
                                message: 'You are currently offline. Please check your internet connection.'
                            }
                        });
                        break;
                    default:
                        Dispatcher.dispatch({
                            event: AccountEvents.ACCOUNT_PASSWORD_RESET_FAILED,
                            data: {
                                field: null,
                                message: 'Unknown error occured.'
                            },
                            __notification: {
                                type: NotificationTypes.ERROR,
                                title: 'Unknown error',
                                message: 'Unknown error occured.'
                            }
                        });
                }
            } else {
                Dispatcher.dispatch({
                    event: AccountEvents.ACCOUNT_PASSWORD_RESET,
                    data: {
                        field: null,
                        message: 'Password reset email has been successfully sent.'
                    }
                });
            }
        });
    }

    deleteAccount (email, password) {
        console.log('Delete account:', email, password); // eslint-disable-line
    }

}

// Export Account Services
export default AccountServices;
