<script>
    import { token } from "../../stores/auth.js";
    import { apiFetch } from "../../interceptors/fetch";


    const getL = async () => {
        try {
            let loc = 'AAA:00:00'
            let {res, data} = await apiFetch(`/api/v1/location?l=${loc}`,{} ,$token);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
</script>

<div>
    <button on:click|preventDefault={getL}>
        HEY
    </button>
</div>



<!-- 

    &{GET /api/v1/location
        HTTP/1.1 1 1
        map[Accept:[*/*]
        Accept-Encoding:[gzip, deflate, br]
        Accept-Language:[en-US,en;q=0.5]
        Accesstoken:[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxIiwicm9sIjoiMSIsImV4cCI6MTY1NTI1MTM0MSwic3ViIjoiZGV2In0.TDfHd2KjJpmTE_OKzYoofCDNA_RmVEtdqBMbCQs9V6I]
        Connection:[keep-alive]
        Dnt:[1] Referer:[http://localhost:3000/]
        Sec-Fetch-Dest:[empty] Sec-Fetch-Mode:[cors]
        Sec-Fetch-Site:[cross-site]
        User-Agent:[Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0]]
        {}
        <nil>
        0
        []
        false
        localhost:1998
        map[] map[] <nil> map[] 127.0.0.1:44082 /api/v1/location <nil> <nil> <nil> 0xc00029e100}

 -->


 <!-- 
     &{GET /api/v1/location?loc=NEW:00:00
        HTTP/1.1 1 1 
        map[Accept:[*/*]
        Accept-Encoding:[gzip, deflate, br]
        Accesstoken:[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxIiwicm9sIjoiMSIsImV4cCI6MTY1NTI1MTcyOCwic3ViIjoiZGV2In0.qgvoufyyskcx3d1CwZFSIUUMraOTfZ5wObTo9n3BVBE]
        Connection:[keep-alive]
        Cookie:[refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxIiwicm9sIjoiMSIsImV4cCI6MTY1NTg1NjIyOCwic3ViIjoiZGV2In0.BdnaKN6m7J6V5zFg7uXXKvDa3YRGOWQwKvP0-fB9FNE]
        Postman-Token:[28b9a3a8-c1c7-4931-9d8c-a16145c587be]
        User-Agent:[PostmanRuntime/7.29.0]]
        {} <nil> 0 [] false localhost:1998 map[] map[] <nil> map[] [::1]:56410
            /api/v1/location?loc=NEW:00:00 <nil> <nil> <nil> 0xc000310000}

  -->