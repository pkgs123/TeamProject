import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import {connect} from 'react-redux';
class Graph extends Component {
    constructor(props){
        super(props)
        this.state={
            labels : ["SCM", "DSM","FIORI"],
        }
    }
    render() {
        return (
            <div>
                <Doughnut
                    data ={{
                        labels : this.state.labels,
                        datasets : [{
                            data : [this.props.countDSM, this.props.countSCM,this.props.countFiori],
                            backgroundColor :['#ED90B0','#967BD1','#B9F6CC']
                        }]
                    }}
                    height = '50%'
                    options = {{
                        legend: {
                            labels: {
                                fontColor: "white",
                                fontSize: 18
                            }
                        }
                    }}
                />
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        deploymentResult: state.Reducer.deploymentRecords,
        countDSM : state.Reducer.countDsm,
        countSCM :  state.Reducer.countScm,
        countFiori : state.Reducer.countFiori
    }
}
export default connect(mapStateToProps)(Graph);
