export default function (state = [], action) {
    switch (action.type) {
        case 'SET_FORM_ELEMENTS':
            return [...state, {formElements: action.formElements}]
        default:
            return state
    }
};