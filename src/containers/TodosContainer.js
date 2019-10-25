// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React, {Component} from 'react';
import Todos from 'components/Todos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';
// import { TodoActions } from 'store/actionCreators';

class TodosContainer extends Component{
    handleChange = (e) => {
        // 인풋값 변경
        const { TodoActions } = this.props;
        TodoActions.changeInput(e.target.value);
    }
    handleInsert = () => {
        //아이템 추가
        const { input, TodoActions } = this.props;
        // const { input } = this.props;
        TodoActions.insert(input);//추가
        TodoActions.changeInput('');//기존인풋값 바꾸기
    }
    handleToggle = (id) => {
        // 삭제선 켜고 끄기
        const { TodoActions } = this.props;
        TodoActions.toggle(id);
    }
    handleRemove = (id) => {
        // 아이템 제거
        const { TodoActions } = this.props;
        TodoActions.remove(id);
    }

    render() {
        const { handleChange, handleInsert, handleToggle, handleRemove } = this;
        const { input, todos } = this.props;
        return(
            <Todos
                input = {input}
                todos = {todos}
                onChange = {handleChange}
                onInsert = {handleInsert}
                onToggle = {handleToggle}
                onRemove = {handleRemove}
            />  
        );
    }
}

export default connect(
    //state 를 비구조화 항당
    ({todo}) => ({
        //immutable 을 사용하니, 값을 조회할때에는 .get을 사용
        input: todo.get('input'),
        todos: todo.get('todos')
        // input: todo.input,
        // todos: todo.todos
    }),
    
    (dispatch) => ({ TodoActions: bindActionCreators(todoActions, dispatch) })
    
)(TodosContainer);