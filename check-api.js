const https = require('http');

const req = https.get('http://localhost:9002/api/levels/11-14', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.length > 0 && json[0].sessions) {
      console.log('Sessions found:');
      json[0].sessions.forEach(s => {
        console.log(`  Session ${s.session_id}: ${s.title}`);
        console.log(`    Has intro: ${!!s.introduction_content}`);
        if (s.introduction_content && s.introduction_content.length > 0) {
          console.log(`    Intro items: ${s.introduction_content.length}`);
        }
      });
    } else {
      console.log('No sessions found in API response');
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});
