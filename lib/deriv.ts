export async function connectDeriv(token: string) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      "wss://ws.derivws.com/websockets/v3?app_id=" +
        process.env.NEXT_PUBLIC_DERIV_APP_ID
    );

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          authorize: token,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("Deriv response:", data);

      if (data.error) {
        console.error("Deriv error:", data.error);

        reject(
          new Error(
            `${data.error.code}: ${data.error.message}`
          )
        );

        ws.close();
        return;
      }

      if (data.msg_type === "authorize") {
        resolve({
          ws,
          account: data.authorize,
        });
      }
    };

    ws.onerror = () => {
      reject(new Error("WebSocket connection failed"));
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };
  });
}
