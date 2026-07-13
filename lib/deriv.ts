export async function connectDeriv(token: string) {
  return new Promise((resolve, reject) => {
    const appId = process.env.NEXT_PUBLIC_DERIV_APP_ID;

    console.log("Using App ID:", appId);

    const ws = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${appId}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");

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
        ws.close();

        reject(
          new Error(
            `${data.error.code}: ${data.error.message}`
          )
        );

        return;
      }

      if (data.msg_type === "authorize") {
        resolve({
          ws,
          account: data.authorize,
        });
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket Error:", event);

      reject(
        new Error("WebSocket failed. Check browser console.")
      );
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };
  });
}
