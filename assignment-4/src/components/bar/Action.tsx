interface ActionBarProp {
    children: JSX.Element | JSX.Element[];
}

function ActionBar(params:ActionBarProp) {
    return (
        <div className="flex items-center flex-col-reverse sm:flex-row-reverse gap-2.5 [&>input]:px-[8.25px] [&>input]:p-2.5 [&>input]:rounded [&>input]:border-[1.5px] [&>input]:border-border-color [&>input]:w-full sm:[&>input]:w-52 [&>button]:w-full sm:[&>button]:w-auto" >
            {params.children}
        </div>
    );
};

export default ActionBar;