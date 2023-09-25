import './Input.css'

export function InputText(params) {
    return (
        <div className="input-container">
            <p>{params.title}</p>
            <input name={params.name} type="text" value={params.value} onChange={params.onChange} {...params}/>
        </div>
    );
}

export function InputSelect(params) {
    const optionsRender = params.options.map(value => <option key={value}>{value}</option>)

    return (
        <div className="input-container">
            <p>{params.title}</p>
            <select name={params.name} onChange={params.onChange} {...params} value={params.value}>
                {optionsRender}
            </select>
        </div>
    )
}