// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React, { Component } from 'react';
import Counter from 'components/Counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from 'store/modules/counter';

class CounterContainer  extends Component{
    handleIncrement  = () => {
        //this.props.increment();   
        const { CounterActions } = this.props;
        CounterActions.increment();
    }
    handleDecrement = () => {
        //this.props.decrement();
        const { CounterActions } = this.props;
        CounterActions.decrement();
    }

    render() {
        const { handleIncrement, handleDecrement } = this;
        const { number } = this.props;
    
        return (
            <Counter 
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            number={number}
            />
        );
      }
}

// props 값으로 넣어 줄 상태를 정의해줍니다.  /   스토어의 상태를 파라미터로 받아오는 함수, 컴포넌트에 상태로 넣어줄 props 반환
/*
const mapStateToProps = (state) => ({
    number: state.counter.number
});
*/

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다  /   dispatch를 파라미터로 받아오는 함수, 컴포넌트에 넣어줄 액션 함수를 반환
/*
const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch(counterActions.increment()),
    decrement: () => dispatch(counterActions.decrement())
})
*/

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
//export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
export default connect(
    (state) => ({
        number: state.counter.number
    }),
    /*
    (dispatch) => ({
        increment: () => dispatch(counterActions.increment()),
        decrement: () => dispatch(counterActions.decrement())
    })
    */
    (dispatch) => ({ CounterActions: bindActionCreators(counterActions, dispatch) })
)(CounterContainer);
