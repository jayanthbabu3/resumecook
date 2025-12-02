// Test script to verify minimal template features
// This would be run in the browser console at http://localhost:8080/dashboard/universal-professional/editor/minimal

console.log('=== Testing Minimal Template ===');

// Test 1: Check if bullet points are rendered in experience
const experienceItems = document.querySelectorAll('.experience-item');
console.log('Experience items found:', experienceItems.length);

// Test 2: Check if bullet points are present
const bulletPoints = document.querySelectorAll('li');
console.log('Bullet points found:', bulletPoints.length);

// Test 3: Check if custom sections are rendered
const customSections = document.querySelectorAll('[data-section="custom"]');
console.log('Custom sections found:', customSections.length);

// Test 4: Check if social links are rendered
const socialLinks = document.querySelectorAll('a[href*="linkedin"], a[href*="github"], a[href*="portfolio"]');
console.log('Social links found:', socialLinks.length);

console.log('=== Test Complete ===');
