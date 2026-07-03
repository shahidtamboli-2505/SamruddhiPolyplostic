#!/usr/bin/env python3
"""
Backend API Test Suite for Samruddhi Polyplast
Tests all API endpoints with comprehensive scenarios
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://export-quality-3.preview.emergentagent.com/api"

def print_test_header(test_num, description):
    """Print formatted test header"""
    print(f"\n{'='*80}")
    print(f"TEST {test_num}: {description}")
    print(f"{'='*80}")

def print_result(success, message):
    """Print test result"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def test_1_get_api_root():
    """Test 1: GET /api → expect 200 and JSON with status, service, time"""
    print_test_header(1, "GET /api (root health check)")
    try:
        response = requests.get(BASE_URL, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check required fields
        if 'status' not in data or data['status'] != 'ok':
            print_result(False, f"Expected status:'ok', got {data.get('status')}")
            return False
        
        if 'service' not in data or data['service'] != 'samruddhi-polyplast':
            print_result(False, f"Expected service:'samruddhi-polyplast', got {data.get('service')}")
            return False
        
        if 'time' not in data:
            print_result(False, "Missing 'time' field")
            return False
        
        # Check CORS headers
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if cors_header != '*':
            print_result(False, f"Expected CORS header '*', got {cors_header}")
            return False
        
        print_result(True, "Root endpoint returns correct structure with CORS headers")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_2_get_health():
    """Test 2: GET /api/health → expect 200 and same shape as root"""
    print_test_header(2, "GET /api/health")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if data.get('status') != 'ok' or data.get('service') != 'samruddhi-polyplast' or 'time' not in data:
            print_result(False, f"Incorrect response structure: {data}")
            return False
        
        print_result(True, "Health endpoint returns correct structure")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_3_post_inquiry_full():
    """Test 3: POST /api/inquiries with full body"""
    print_test_header(3, "POST /api/inquiries (full body)")
    try:
        payload = {
            "fullName": "Rajesh Kumar",
            "company": "Global Exports Ltd",
            "country": "Netherlands",
            "phone": "+31-20-1234567",
            "email": "rajesh.kumar@globalexports.nl",
            "product": "PP Gerbera Cover",
            "message": "Need quotation for 50,000 pcs Gerbera covers for export to Europe."
        }
        
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False, None
        
        data = response.json()
        
        if not data.get('ok'):
            print_result(False, f"Expected ok:true, got {data.get('ok')}")
            return False, None
        
        if 'id' not in data or not data['id']:
            print_result(False, "Missing or empty 'id' field")
            return False, None
        
        inquiry_id = data['id']
        print_result(True, f"Inquiry created successfully with id: {inquiry_id}")
        return True, inquiry_id
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False, None

def test_4_get_inquiries(expected_email):
    """Test 4: GET /api/inquiries → verify newly created record"""
    print_test_header(4, "GET /api/inquiries (verify persistence)")
    try:
        response = requests.get(f"{BASE_URL}/inquiries", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if 'inquiries' not in data:
            print_result(False, "Missing 'inquiries' field in response")
            return False
        
        inquiries = data['inquiries']
        print(f"Total inquiries returned: {len(inquiries)}")
        
        # Find our test inquiry
        found = None
        for inq in inquiries:
            if inq.get('email') == expected_email and inq.get('product') == 'PP Gerbera Cover':
                found = inq
                break
        
        if not found:
            print_result(False, f"Could not find inquiry with email {expected_email}")
            return False
        
        # Verify all fields are persisted
        required_fields = ['id', 'fullName', 'company', 'country', 'phone', 'email', 'product', 'message', 'createdAt']
        missing_fields = [f for f in required_fields if f not in found]
        
        if missing_fields:
            print_result(False, f"Missing fields in persisted inquiry: {missing_fields}")
            return False
        
        # Verify field values
        if found['fullName'] != 'Rajesh Kumar':
            print_result(False, f"fullName mismatch: expected 'Rajesh Kumar', got '{found['fullName']}'")
            return False
        
        if found['company'] != 'Global Exports Ltd':
            print_result(False, f"company mismatch")
            return False
        
        if found['country'] != 'Netherlands':
            print_result(False, f"country mismatch")
            return False
        
        print(f"Found inquiry: {json.dumps(found, indent=2)}")
        print_result(True, "All fields persisted correctly")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_5_post_newsletter():
    """Test 5: POST /api/newsletter"""
    print_test_header(5, "POST /api/newsletter")
    try:
        payload = {"email": "newsletter@globalexports.nl"}
        
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get('ok') or 'id' not in data:
            print_result(False, f"Expected {{ok:true, id:'...'}}, got {data}")
            return False
        
        print_result(True, f"Newsletter signup successful with id: {data['id']}")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_6_post_inquiry_empty():
    """Test 6: POST /api/inquiries with empty body"""
    print_test_header(6, "POST /api/inquiries (empty body)")
    try:
        response = requests.post(f"{BASE_URL}/inquiries", json={}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get('ok') or 'id' not in data:
            print_result(False, f"Expected {{ok:true, id:'...'}}, got {data}")
            return False
        
        print_result(True, "Empty inquiry accepted (all fields optional)")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_7_get_not_found():
    """Test 7: GET /api/does-not-exist → 404"""
    print_test_header(7, "GET /api/does-not-exist (404 handling)")
    try:
        response = requests.get(f"{BASE_URL}/does-not-exist", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 404:
            print_result(False, f"Expected status 404, got {response.status_code}")
            return False
        
        data = response.json()
        
        if 'error' not in data:
            print_result(False, f"Expected 'error' field in 404 response, got {data}")
            return False
        
        print_result(True, "GET to unknown path returns 404 with error JSON")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_8_post_not_found():
    """Test 8: POST /api/does-not-exist → 404"""
    print_test_header(8, "POST /api/does-not-exist (404 handling)")
    try:
        response = requests.post(f"{BASE_URL}/does-not-exist", json={}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 404:
            print_result(False, f"Expected status 404, got {response.status_code}")
            return False
        
        data = response.json()
        
        if 'error' not in data:
            print_result(False, f"Expected 'error' field in 404 response, got {data}")
            return False
        
        print_result(True, "POST to unknown path returns 404 with error JSON")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_9_options():
    """Test 9: OPTIONS /api → 200"""
    print_test_header(9, "OPTIONS /api (CORS preflight)")
    try:
        response = requests.options(BASE_URL, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        # Check CORS headers
        allow_origin = response.headers.get('Access-Control-Allow-Origin')
        allow_methods = response.headers.get('Access-Control-Allow-Methods')
        allow_headers = response.headers.get('Access-Control-Allow-Headers')
        
        if allow_origin != '*':
            print_result(False, f"Expected Access-Control-Allow-Origin: *, got {allow_origin}")
            return False
        
        print(f"CORS Headers:")
        print(f"  Allow-Origin: {allow_origin}")
        print(f"  Allow-Methods: {allow_methods}")
        print(f"  Allow-Headers: {allow_headers}")
        
        print_result(True, "OPTIONS request handled correctly with CORS headers")
        return True
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_10_cors_headers():
    """Test 10: Verify CORS headers on all responses"""
    print_test_header(10, "CORS headers verification")
    try:
        endpoints = [
            ("GET", BASE_URL),
            ("GET", f"{BASE_URL}/health"),
            ("GET", f"{BASE_URL}/inquiries"),
        ]
        
        all_pass = True
        for method, url in endpoints:
            response = requests.request(method, url, timeout=10)
            cors_header = response.headers.get('Access-Control-Allow-Origin')
            
            if cors_header != '*':
                print(f"❌ {method} {url}: Expected CORS header '*', got {cors_header}")
                all_pass = False
            else:
                print(f"✅ {method} {url}: CORS header present")
        
        if all_pass:
            print_result(True, "All endpoints return correct CORS headers")
        else:
            print_result(False, "Some endpoints missing CORS headers")
        
        return all_pass
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("SAMRUDDHI POLYPLAST BACKEND API TEST SUITE")
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    print("="*80)
    
    results = {}
    
    # Test 1: GET /api
    results['test_1'] = test_1_get_api_root()
    
    # Test 2: GET /api/health
    results['test_2'] = test_2_get_health()
    
    # Test 3: POST /api/inquiries (full)
    test_3_pass, inquiry_id = test_3_post_inquiry_full()
    results['test_3'] = test_3_pass
    
    # Test 4: GET /api/inquiries (verify persistence)
    if test_3_pass:
        results['test_4'] = test_4_get_inquiries("rajesh.kumar@globalexports.nl")
    else:
        print_test_header(4, "GET /api/inquiries (SKIPPED - Test 3 failed)")
        results['test_4'] = False
    
    # Test 5: POST /api/newsletter
    results['test_5'] = test_5_post_newsletter()
    
    # Test 6: POST /api/inquiries (empty)
    results['test_6'] = test_6_post_inquiry_empty()
    
    # Test 7: GET 404
    results['test_7'] = test_7_get_not_found()
    
    # Test 8: POST 404
    results['test_8'] = test_8_post_not_found()
    
    # Test 9: OPTIONS
    results['test_9'] = test_9_options()
    
    # Test 10: CORS headers
    results['test_10'] = test_10_cors_headers()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("="*80)
    
    # Exit with appropriate code
    sys.exit(0 if passed == total else 1)

if __name__ == "__main__":
    main()
