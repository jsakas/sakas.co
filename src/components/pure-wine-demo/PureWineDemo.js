import React, { Fragment } from 'react';

import './PureWineDemo.scss';

import Logo from './Logo';

const PureWineDemo = () => {
    return (
        <Fragment>
            <style>
                {`
                    html {
                        background: #eaeced;
                    }

                    html body {
                        background: url(${require('./page-bg-opacity-3.png')}) no-repeat center center fixed;
                        background-size: cover;
                        width: 100vw;
                        height: 100vh;
                        background-position: 62%;
                    }
                `}
            </style>
            <div className="FPO">FPO</div>
            <div className="PureWineDemo">
                <div className="PureWineDemo__container">
                    <div className="PureWineDemo__logo-container">
                        <Logo className="PureWineDemo__logo" />
                    </div>
                    <div className="PureWineDemo__text-container">
                        <h1>
                            Are&nbsp;you&nbsp;ready<br />
                            for&nbsp;the&nbsp;biggest<br />
                            wine&nbsp;<strong>innovation</strong><br />
                            in&nbsp;our&nbsp;lifetime?<br />
                        </h1>
                        <h2>Pouring&nbsp;soon</h2>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PureWineDemo;
