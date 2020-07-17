const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.addOrder = functions.https.onCall(async (data, context) => {
    const Id = await admin.firestore().collection("IDs").doc("IDS").get()
    const orderID = Id.data().order_ids;

    const arg = orderID.toString();
    await admin.firestore().collection("orders").doc(arg).set({
        ...data,
        order_id: orderID,
        date: new Date(),
        delivery: null,
        state: -1,
        done: false
    })
    await admin.firestore().collection('IDs').doc('IDS').update({ order_ids: orderID + 1 })
    return "success123"
})

exports.updateOrder = functions.https.onCall(async (data, context) => {
    const id = data.idtt.toString();
    await admin.firestore().collection("orders").doc(id).update({
        ...data
    })
    await admin.firestore().collection('order_end').doc(id).set({
        delivery_clc: data.delivery_clc,
        client_clc: data.client_clc,
        calc_state: false
    })

})


exports.finishClientCalc = functions.https.onCall(async (data, context) => {
    const Id = await admin.firestore().collection("clc_ids").doc("clc_ID").get()
    const orderID = Id.data().clc_id; //7

    const arg = orderID.toString();
    await admin.firestore().collection("clc_finished").doc(arg).set({
        ...data,
        day: new Date(),
    })

    await admin.firestore().collection('clc_ids').doc('clc_ID').update({ clc_id: orderID + 1 })
    const orders1 = data.orders
    orders1.forEach(async row => {
        const idd = row.order_id.toString()
        await admin.firestore().collection("orders").doc(idd).update({
            done: true,

        })
    })


})
// exports.addDof3a = functions.https.onCall(async (data, context) => {
//     const client = await admin.firestore().collection("clients").doc(data.IDDD).get()
//     const dof3a = client.data().dof3a + data.dof3a122
//     await admin.firestore().collection('clients').doc(client.id).update({ dof3a: dof3a })
//     return "Done baby"
// })