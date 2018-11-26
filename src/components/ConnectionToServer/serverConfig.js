import React from 'react';


const saveSubscription = async (deviceId,witness) =>{
    try {
        console.log("DeviceId:",deviceId);
        console.log("Saved Witness",witness);
        await fetch("http://api.esteem.ws:8080/api/wdevices", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceid: deviceId,
                witness: witness,
            }),
        }).then((response)=>response.json())
            .catch((error)=>console.error("error on subscription",error));
    } catch (e) {
        console.log('Subscriptionda xato',e)
    }
    //return $http.post("http://api.esteem.ws:8080/api/wdevices",{deviceid:deviceid,witness:witness})
} ;
function getSubscription(deviceId){
    //console.log("getSubscription");
    return fetch("http://api.esteem.ws:8080/api/wdevices/"+deviceId)
        .then((response)=> response.json())
        .then((responseJson) => {
            let i;
            let subscribedWitnesses = [];
            for (i = 0; i < responseJson.length; i++) {
                subscribedWitnesses[i] = responseJson[i].witness;
            }
            console.log("witneeeeee", subscribedWitnesses);
            return subscribedWitnesses;
        })
        .catch((error)=> {
            console.log(error);
        })
    //return $http.get("http://api.esteem.ws:8080/api/wdevices/"+deviceid)
}
const updateSubscription=(deviceId,witness,del)=>{
    if(!del){
        return $http.put("http://api.esteem.ws:8080/api/wdevices",{deviceid:deviceId,witness:witness})
    }else {
        return $http.put("http://api.esteem.ws:8080/api/wdevices",{deviceid:deviceId,witness:witness,delete:true})
    }
};
const updateParticipation = async (deviceId,status)=>{
    try {
        console.log("DeviceId:",deviceId);
        console.log("Status",status);
        await fetch("http://api.esteem.ws:8080/api/wdevicesp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceid: deviceId,
                participation: status,
            }),
        }).then((response)=>response.json())
            .catch((error)=>console.error("error on participation",error));
    } catch (e) {
        console.log('Participationda xato',e)
    }

    //return $http.post("http://api.esteem.ws:8080/api/wdevicesp",{deviceid:deviceId,participation:status})
};
const getParticipation = async (deviceId)=>{
    console.log("Participation ",deviceId);
    let response = await fetch("http://api.esteem.ws:8080/api/wdevicesp/"+deviceId);
    // let responseJson = await response.json();
    console.log("Participation Response ",response);
   // return $http.get("http://api.esteem.ws:8080/api/wdevicesp/"+deviceId)
};
const deleteSubscription = async (deviceId,witness)=>{
    try {
        console.log("DeviceId:",deviceId);
        console.log("Deleted Witness",witness);
        await fetch("http://api.esteem.ws:8080/api/wdevices/"+deviceId+"/"+witness, {
            method: 'DELETE',
    }).then((response)=>response.json())
        .catch((error)=>console.error("error on delete subscription",error));
} catch (e) {
    console.log('Subscription delete',e)
}
    //return $http.delete("http://api.esteem.ws:8080/api/wdevices/"+deviceId+"/"+witness)
};

export {saveSubscription,getSubscription,updateParticipation,updateSubscription,getParticipation,deleteSubscription} ;