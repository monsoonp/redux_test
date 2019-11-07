import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

const CHANGE_INPUT = "todo/CHANGE_INPUT";
const INSERT = "todo/INSERT";
const TOGGLE = "todo/TOGGLE";
const REMOVE = "todo/REMOVE";

//export const changeInput = createAction(CHANGE_INPUT);
export const changeInput = createAction(CHANGE_INPUT, value => value);
export const insert = createAction(INSERT, text => text);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);
// 액션함수 참조할 값 필요
// 액션생성함수에 파라미터를 넣어서 호출하면 자동으로 payload라는 이름으로 통일되어 설정
// {type: 'todo/CHANGE_INPUT, payload:'새로운 값'}
/*
여러 종류의 값을 전달해야 할때
const multi = creatAction('MULTI');
multi({foo:1, bar:2})
{type: 'todo/CHANGE_INPUT, payload:{foo:1, bar:2}}
creacteAction함수가 받는 세가지 파라미터 액션이름, payloadCreator, metaCreator
const sample = creatAction('SAMPLE', (value) => value +1, (value) => value-1);
sample(1)
*/

let id = 0; //todo 아이템에 들어갈 고유값

const initialState = Map({
  input: "",
  todos: List()
});

export default handleActions(
  {
    // 한줄짜리 코드로 반환 할 수 있는 경우 다음과 같이 블록{}을 생략 가능
    [CHANGE_INPUT]: (state, action) => state.set("input", action.payload),
    [INSERT]: (state, { payload: text }) => {
      // 위 코드는 action 객체를 비구조화 할당하고, payload 값을 text라고 부르겠다는 의미
      const item = Map({ id: id++, checked: false, text }); // 하나 추가 할떼마다 id 값을 증가시킴
      return state.update("todos", todos => todos.push(item));
    },
    [TOGGLE]: (state, { payload: id }) => {
      // id 값을 가진 index 를 찾아서 checked 값을 반전
      const index = state.get("todos").findIndex(item => item.get("id") === id);
      return state.updateIn(["todos", index, "checked"], checked => !checked);
    },
    [REMOVE]: (state, { payload: id }) => {
      //id 값을 가진 index를 찾아서 지움
      const index = state.get("todos").findIndex(item => item.get("id") === id);
      return state.deleteIn(["todos", index]);
    }
  },
  initialState
);
