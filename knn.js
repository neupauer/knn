// REQUIRES UNDERSCORE IN GLOBAL SCOPE
// https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js
const _ = window._;

/**
 * Vypočíta euklidovskú vzdialenosť medzi bodmi.
 *
 * @param {Number[]} pointA
 * @param {Number[]} pointB
 */
const distance = (pointA, pointB) => {
  const a = pointA[0] - pointB[0];
  const b = pointA[1] - pointB[1];

  return Math.pow(Math.pow(a, 2) + Math.pow(b, 2), 0.5);
};

/**
 * Zoradí dataset na základe vzdialenosti od hľadaného prvku.
 *
 * @param {*} sample
 * @param {*} dataset
 */
const sort = (sample, dataset) => {
  return _.sortBy(dataset, (item) => distance(item, sample));
};

/**
 * Funkcia nám vráti K najbližších susedov hľadaného prvku.
 *
 * @param {*} dataset
 * @param {*} k
 */
const topK = (dataset, k) => _.first(dataset, k);

/**
 * Funkcia vráti počet tried v datasete (3. argument)
 *
 * @param {*} dataset
 */
var classCount = (dataset) => _.countBy(dataset, (item) => item[2]);

/**
 * K-nearest Neighbors (KNN) Classification
 *
 * @param {*} input
 */
window.classifyInput = function (dataset, k = 3, input) {
  var classify = function (dataset) {
    return _.max(_.pairs(dataset), function (item) {
      return item[1];
    })[0];
  };

  var sorted_dataset = sort(input, dataset);
  var top_k = topK(sorted_dataset, k);
  var counts = classCount(top_k);
  var classification = classify(counts);
  console.log("classification", classification);
  return classification;
};
