async function testAPI() {
  try {
    const response = await fetch('http://localhost:9002/api/levels/11-14/1');
    const data = await response.json();

    console.log('\n=== API Response Check ===');
    console.log('Number of sessions:', data.level?.sessions?.length);

    const session5 = data.level?.sessions?.find(s => s.session_id === 5);
    if (session5) {
      console.log('\nSession 5 found:');
      console.log('- Title:', session5.title);
      console.log('- Has introduction_content:', !!session5.introduction_content);
      if (session5.introduction_content) {
        console.log('- Introduction preview:', session5.introduction_content.substring(0, 100));
      } else {
        console.log('⚠️  NO introduction_content in API response!');
      }
    } else {
      console.log('❌ Session 5 not found in API response');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
