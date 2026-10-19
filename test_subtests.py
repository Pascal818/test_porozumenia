"""Run: python -m unittest test_subtests.py"""
import unittest
import unicodedata
from pathlib import Path
from test_porozumenia import TASKS_BY_LANGUAGE, evaluate
from web import get_tasks, grade_request, FILES

class Subtests(unittest.TestCase):
 def test_eight_distinct_types_and_source(self):
  for lang,tasks in TASKS_BY_LANGUAGE.items():
   self.assertEqual([t['subtest'] for t in tasks.values()],list(range(1,9)))
   self.assertEqual(len({t['type'] for t in tasks.values()}),8)
   self.assertEqual(sum(t['source']['original_item_count'] for t in tasks.values()),80)
   self.assertEqual(len(get_tasks(lang)['tasks']),8)
   for t in tasks.values():
    self.assertTrue(t['source']['original_prompt'])
    self.assertTrue(t['adaptation_note'])
    self.assertNotIn('correct_choice',next(x for x in get_tasks(lang)['tasks'] if x['id']==t['id']))
 def test_language_specific_images(self):
  for lang in TASKS_BY_LANGUAGE:
   for task in get_tasks(lang)['tasks']:
    self.assertEqual(task['image'].startswith('/images/sk/'),lang=='sk')
    self.assertEqual(task['image_set'],'sk_ai_v1' if lang=='sk' else 'article_figures_v1')
    for option in task['options']:
     self.assertEqual(option['image'].startswith('/images/sk/'),lang=='sk')
     self.assertEqual(option['crop']=='full',lang!='sk')
  self.assertIn('sponky',TASKS_BY_LANGUAGE['sk']['SUBTEST_06']['adaptation_note'])
  self.assertNotIn('vľavo hore',TASKS_BY_LANGUAGE['sk']['SUBTEST_04']['scene'])
 def test_pair_completeness_and_order(self):
  for lang,tasks in TASKS_BY_LANGUAGE.items():
   self.assertEqual(evaluate(tasks['SUBTEST_01']['examples'][0][0],'SUBTEST_01',lang)['status'],'correct')
  self.assertEqual(evaluate('Chlapec má šiltovku a dievča má klobúk.')['status'],'correct')
  self.assertEqual(evaluate('Dievča má klobúk.')['status'],'incomplete')
  for text in ['Klobúk a šiltovka.','Dievča nemá klobúk a chlapec nemá šiltovku.','Dievča má šiltovku a chlapec má klobúk.']:
   self.assertEqual(evaluate(text)['status'],'needs_review')
 def test_report_not_reality(self):
  self.assertEqual(evaluate('Rybu.','SUBTEST_02')['score'],1)
  self.assertEqual(evaluate('Starú čižmu.','SUBTEST_02')['score'],0)
 def test_picture_keys(self):
  for lang in TASKS_BY_LANGUAGE:
   for tid,answer in [('SUBTEST_03','C'),('SUBTEST_07','B')]:
    for option in 'ABC': self.assertEqual(evaluate(option,tid,lang)['score'],int(option==answer))
    self.assertIsNone(evaluate('AB',tid,lang)['score'])
 def test_morphology_needs_review_even_for_example(self):
  for lang,tasks in TASKS_BY_LANGUAGE.items():
   for i in (4,5,6):
    t=tasks[f'SUBTEST_{i:02}'];r=evaluate(t['examples'][0][0],t['id'],lang)
    self.assertEqual(r['status'],'needs_review');self.assertIsNone(r['score']);self.assertTrue(t['scene'])
 def test_missing_gender_never_scores(self):
  for lang in ('en','vi'):
   for answer in ('A','B','C','dog','cat',''):
    r=evaluate(answer,'SUBTEST_08',lang);self.assertEqual(r['status'],'unscorable');self.assertIsNone(r['score'])
  self.assertEqual(evaluate('C','SUBTEST_08','sk')['score'],1)
 def test_unicode_and_empty(self):
  answer=TASKS_BY_LANGUAGE['vi']['SUBTEST_01']['examples'][0][0]
  self.assertEqual(evaluate(unicodedata.normalize('NFD',answer),'SUBTEST_01','vi')['score'],1)
  for lang,tasks in TASKS_BY_LANGUAGE.items():
   for tid in tasks: self.assertIsNone(evaluate('',tid,lang)['score'])
 def test_assets_and_invalid_api(self):
  for relative,_ in FILES.values():self.assertTrue((Path(__file__).parent/relative).is_file())
  for data in ({},[],{'language':'sk','task_id':'SUBTEST_01','answer':'x'*2001}):
   with self.assertRaises(ValueError):grade_request(data)

if __name__=='__main__':unittest.main()
