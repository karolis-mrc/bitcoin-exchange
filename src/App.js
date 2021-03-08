import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import CurrencyFormat from 'react-currency-format';

import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

class App extends Component{
    constructor(props) {
        super(props)

        this.state = {
            btcValue: "",
            eurValue: "",
            usdValue: "",
            gbpValue: "",
            showEur: true,
            showUsd: false,
            showGbp: false,
            eurRate: "",
            usdRate: "",
            gbpRate: "",
            updateTime: ""
        };
    };

    componentDidMount() {
        this.getRates();

        setInterval( this.getRates, 60 * 1000 );
    };

    handleBtcValue = ( e ) => {
        this.setState({ btcValue: e.target.value });

        this.convert( e.target.value );
    };

    getRates = () => {
        fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
            this.setState({ eurRate: data.bpi.EUR.rate_float });
            this.setState({ usdRate: data.bpi.USD.rate_float });
            this.setState({ gbpRate: data.bpi.GBP.rate_float });
        })
        .catch((err) => console.log(err));

        let current_date = new Date();
        let hours = current_date.getHours();
        let minutes = ( "0" + current_date.getMinutes() ).slice( -2 );
        let time = hours + ":" + minutes;

        this.setState({ updateTime: time });
    };

    convert = ( value ) => {
        this.setState({ eurValue: value * this.state.eurRate });
        this.setState({ usdValue: value * this.state.usdRate });
        this.setState({ gbpValue: value * this.state.gbpRate });
    };

    addCard = ( card ) => {
        if ( card === "EUR" ) {
            this.setState({ showEur: true });
        }

        if ( card === "USD" ) {
            this.setState({ showUsd: true });
        }

        if ( card === "GBP" ) {
            this.setState({ showGbp: true});
        }
    };

    removeCard = ( card ) => {
        if ( card === "EUR" ) {
            this.setState({ showEur: false });
        }

        if ( card === "USD" ) {
            this.setState({ showUsd: false });
        }

        if ( card === "GBP" ) {
            this.setState({ showGbp: false});
        }
    };

    render() {
        return (
            <div className="App">
                <div className="container d-flex flex-column rounded shadow-lg">
                    <h1 className="header">Bitcoin Exchange</h1>
    
                    <div className="currencies-dropdown d-flex justify-content-end mr-3">
                        <Dropdown>
                            <Dropdown.Toggle className="btn btn-info dropdown-toggle" id="currency-dropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Currency</Dropdown.Toggle>
    
                            <Dropdown.Menu className="dropdown-menu" aria-labelledby="currency-dropdown">
                                <Dropdown.Item onClick={ () => this.addCard( "EUR" ) } className={ "dropdown-item" + ( this.state.showEur ? " d-none": " d-block" ) }>EUR</Dropdown.Item>
                                <Dropdown.Item onClick={ () => this.addCard( "USD" ) } className={ "dropdown-item" + ( this.state.showUsd ? " d-none": " d-block" ) }>USD</Dropdown.Item>
                                <Dropdown.Item onClick={ () => this.addCard( "GBP" ) } className={ "dropdown-item" + ( this.state.showGbp ? " d-none": " d-block" ) }>GBP</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
    
                    <div className="exchange-form">
                        <form>
                            <div className="form-group d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="btc-input" className="btc-label">Type your BTC amount:</label>

                                    <div className="update-field">Last upadate: { this.state.updateTime }</div>
                                </div>
                                        
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="btc-input" 
                                    value={ this.state.btcValue } 
                                    onChange={ this.handleBtcValue } 
                                    placeholder="Type here..."
                                />
                            </div>
    
                            <div className="other-currencies-container">
                                <div className="card currency-card mb-2" style={{ display: this.state.showEur  ? "block" : "none" }}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="currency">€ EUR</h4>
    
                                        <button onClick={ () => this.removeCard( "EUR" ) } type="button" className="btn btn-danger remove-btn">Remove</button >
                                    </div>
                                    <div className="card-body">
                                        <CurrencyFormat 
                                            readOnly
                                            value={ this.state.eurValue } 
                                            displayType={ "input" } 
                                            thousandSeparator={true} 
                                            prefix={ "€" } 
                                            decimalScale={ 2 } 
                                        />
                                    </div>
                                </div> 
    
                                <div className="card currency-card mb-2" style={{ display: this.state.showUsd ? "block"  : "none" }}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="currency">$ USD</h4>
    
                                        <button onClick={ () => this.removeCard( "USD" ) } type="button" className="btn btn-danger remove-btn">Remove</button >
                                    </div>
                                    <div className="card-body">
                                        <CurrencyFormat 
                                            readOnly
                                            value={ this.state.usdValue } 
                                            displayType={ "input" } 
                                            thousandSeparator={true} 
                                            prefix={ "$" } 
                                            decimalScale={ 2 } 
                                        />
                                    </div>
                                </div> 
    
                                <div className="card currency-card mb-2" style={{ display: this.state.showGbp  ? "block"  : "none" }}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="currency">£ GBP</h4>
    
                                        <button onClick={ () => this.removeCard( "GBP" ) } type="button" className="btn btn-danger remove-btn">Remove</button >
                                    </div>
                                    <div className="card-body">
                                        <CurrencyFormat 
                                            readOnly
                                            value={ this.state.gbpValue } 
                                            displayType={ "input" } 
                                            thousandSeparator={true} 
                                            prefix={ "£" } 
                                            decimalScale={ 2 } 
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default App;
