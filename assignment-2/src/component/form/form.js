import './Form.css'

function Form(params) {
   return (
    <form className="form" onSubmit={params.onSubmit}>
        {params.children}
    </form>
   );
};

export default Form;