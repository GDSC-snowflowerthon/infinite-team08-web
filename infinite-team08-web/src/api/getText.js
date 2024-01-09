const axios = require('axios');
const fs = require('fs');

const sendPostRequest = async () => {
  try {
    const imageStream = fs.createReadStream('data.jpg'); // 이미지 파일을 읽어 스트림 생성

    const response = await axios.post('http://ec2-13-125-184-136.ap-northeast-2.compute.amazonaws.com/image_to_text', imageStream, {
      headers: {
        'Content-Type': 'application/octet-stream', // raw 데이터 형식으로 전송
      },
    });

    console.log('POST 요청 성공:', response.data);
    // 요청이 성공했을 때 할 작업들
  } catch (error) {
    console.error('POST 요청 실패:', error);
    // 요청이 실패했을 때 할 작업들
  }
};

module.exports = sendPostRequest;
