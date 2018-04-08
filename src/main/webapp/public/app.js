var TempHumidity = React.createClass({

    getInitialState: function () {
        return {display: true};
    },
    handleDelete() {
        var self = this;
        $.ajax({
            url: self.props.tempHumidity._links.self.href,
            type: 'DELETE',
            success: function (result) {
                self.setState({display: false});
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    render: function () {

        if (this.state.display == false)
            return null;
        else
            return (
                    <tr>
                        <td>{this.props.tempHumidity._links.self.href}</td>
                        <td>{this.props.tempHumidity.temperature}</td>
                        <td>{this.props.tempHumidity.humidity}</td>
                        <td>{this.props.tempHumidity.timestamp}</td>
                        <td>
                            <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                        </td>
                    </tr>
                    );
    }
});

var TempHumiditiesTable = React.createClass({

    render: function () {

        var rows = [];
        this.props.tempHumidities.forEach(function (tempHumidity) {
            rows.push(
                    <TempHumidity tempHumidity={tempHumidity} key={tempHumidity.id} />);
        });

        return (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Timestamp</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                );
    }
});

var App = React.createClass({

    loadTempHumiditiesFromServer: function () {

        var self = this;
        $.ajax({
            url: "http://localhost:8080/tempHumidities",
        }).then(function (data) {
            self.setState({tempHumidities: data._embedded.tempHumidities});
        });

    },

    getInitialState: function () {
        return {tempHumidities: []};
    },

    componentDidMount: function () {
        this.loadTempHumiditiesFromServer();
    },

    render() {
        return (<TempHumiditiesTable tempHumidities={this.state.tempHumidities} />);
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
