'use client'

import { signIn } from "next-auth/react";
import ActionBar from "../../../../components/bar/Action";
import Button from "../../../../components/form/Button";
import Form from "../../../../components/form/Form";
import InputSelect from "../../../../components/form/InputSelect";
import InputText from "../../../../components/form/InputText";

function LoginPage(props) {
    const a = () => {
        signIn("credentials", { username: "jsmi11111th", password: "1234"})
    }

    return (
        <div>
            <button type="button" onClick={a}>cccc</button>
             {/* <Form onSubmit={onCreate}>
                <InputText
                    title="Name"
                    name="name"
                    value={addBookForm.name}
                    onChange={onChange}
                    required
                />
                <InputText
                    title="Author"
                    name="author"
                    value={addBookForm.author}
                    onChange={onChange}
                    required
                />
                <InputSelect
                    title="Topic"
                    name="topic"
                    options={['Programming', 'Database', 'DevOps']}
                    value={addBookForm.topic}
                    onChange={onChange}
                    required
                />
                <ActionBar>
                    <Button type="submit" active>
                        Create
                    </Button>
                </ActionBar>
            </Form> */}
        </div>
    )
}

export default LoginPage;