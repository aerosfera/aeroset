import {select, SelectEffect} from "redux-saga/effects";
import {ApplicationState} from "../../store/store";

export function selectState<T>(selector: (s: ApplicationState) => T): SelectEffect {
    return select(selector);
}