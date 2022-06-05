<!--
<script>
    import {token} from "../stores/auth.js";

    export const GetRoles = async () => {
        try {
            const res = await fetch('http://localhost:1998/api/v1/roles', {
                headers: {
                    'accessToken': $token
                }
            });
            const data = await res.json();
            if (res.status !== 200) {
                alert(data.error);
                return
            }
            return data;
        } catch (error) {
            console.log(error)
        }
    }
</script>-->
