// 코드 발급
const create4DigitCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    return code + "";
  };
  
  // redis에 key-value 형태로 저장
  const saveAuthCode = async (key, code) => {
    await client.set(key, code, { EX: 180});
  };
  
  // 코드 일치 여부 확인
  const compareAuthCode = async (key, code) => {
    const result = await client.get(key);
    console.log(result);
    if (code === result) {
      await client.del(key);
      return true;
    } else {
      return false;
    }
  };
  
  // NCP SENS를 이용하는 문자 전송 
  const sendMessageService = async (to, content) => {
    // const { to, content } = req.body;
    const timestamp = Date.now() + "";
    const signature = getSignature(SMS_ID, ACCESS_KEY, SECRET_KEY, timestamp);
  
    // 문자열 배열 || 문자열 에 대한 예외처리
    console.log(to instanceof Array);
    const messages =
      to instanceof Array
        ? to.map(
            (number) =>
              new Object({
                to: number,
              })
          )
        : [{ to: to }];
  
    const body = JSON.stringify({
      type: "SMS",
      countryCode: "82",
      from: "01033339999",
      content,
      messages,
    });
  
    const response = await fetch(
      `http://localhost:80`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key": `${ACCESS_KEY}`,
          "x-ncp-apigw-signature-v2": signature,
        },
        body: body,
      }
    );
  
    const result = await response.json();
  
    if (result.statusCode === "202") {
      logger.info("문자 전송 성공");
      return 1;
    } else {
      logger.error("문자 전송 실패");
      return 0;
    }
  };